@echo off
echo Changing DNS to Google DNS (8.8.8.8 and 8.8.4.4)
echo This requires Administrator privileges
echo.
netsh interface ip show interfaces
echo.
set /p interface="Enter your network interface name (e.g., 'Wi-Fi' or 'Ethernet'): "
netsh interface ip set dns "%interface%" static 8.8.8.8
netsh interface ip add dns "%interface%" 8.8.4.4 index=2
echo.
echo DNS changed successfully!
echo Please flush DNS cache:
ipconfig /flushdns
echo.
echo Now restart your dev server
pause
