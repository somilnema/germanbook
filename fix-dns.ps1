# Run this PowerShell script as Administrator
# Right-click PowerShell -> Run as Administrator

Write-Host "Changing DNS to Google DNS for MongoDB Atlas connectivity..." -ForegroundColor Green
Write-Host ""

# Get active network interface
$adapter = Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object -First 1
Write-Host "Active Network: $($adapter.Name)" -ForegroundColor Yellow

# Set Google DNS
try {
    Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses ("8.8.8.8","8.8.4.4")
    Write-Host "✓ DNS changed successfully!" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to change DNS: $_" -ForegroundColor Red
    Write-Host "Please run this script as Administrator" -ForegroundColor Yellow
    exit 1
}

# Flush DNS cache
Write-Host ""
Write-Host "Flushing DNS cache..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "✓ DNS cache flushed!" -ForegroundColor Green

# Verify DNS settings
Write-Host ""
Write-Host "Current DNS Settings:" -ForegroundColor Yellow
Get-DnsClientServerAddress -InterfaceAlias $adapter.Name -AddressFamily IPv4 | Select-Object ServerAddresses | Format-List

Write-Host ""
Write-Host "Testing MongoDB connection..." -ForegroundColor Yellow
$result = Test-NetConnection -ComputerName cluster0.gjn5j3r.mongodb.net -Port 27017 -WarningAction SilentlyContinue

if ($result.TcpTestSucceeded) {
    Write-Host "✓ MongoDB Atlas is now accessible!" -ForegroundColor Green
} else {
    Write-Host "⚠ Still having issues. Please wait 30 seconds for DNS to propagate..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Close your current PowerShell terminal" -ForegroundColor White
Write-Host "2. Open a new terminal" -ForegroundColor White
Write-Host "3. Run: cd 'C:\Users\ASUS\Downloads\apply-solo\apply-solo'" -ForegroundColor White
Write-Host "4. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
