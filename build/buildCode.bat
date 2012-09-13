
::合并文件
for /f %%i in (OpenCharts.txt) do type %%i >> OpenChart-debug.js
for /f %%i in (OpenCharts2.txt) do type %%i >> OpenChart-debug2.js

:: 初步压缩
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/OpenChart.js OpenChart-debug.js 
java -jar ../tools/compressor/yuicompressor-2.4.2.jar --type js --charset utf-8 -o ../tools/compressor/OpenChart2.js OpenChart-debug2.js 
 
::删除合并后的文件
del OpenChart-debug.js /f /q
del OpenChart-debug2.js /f /q

::删除源码中的文件
del "..\OpenCharts-min.js" /f /q

::运行混淆工具
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/OpenChart.js >> ../tools/compressor/OpenChart_compress.js
CScript /nologo ../tools/compressor/pack.wsf ../tools/compressor/OpenChart2.js >> ../tools/compressor/OpenChart_compress2.js

cd /d ../tools/compressor
for /f %%i in (compress.txt) do type %%i >> ../../OpenCharts-min.js

::删除压缩后的文件
del OpenChart.js
del OpenChart2.js
del OpenChart_compress.js
del OpenChart_compress2.js

::转换格式为UTF-8
dir "..\..\OpenCharts-min.js" /A-D /B /S > encode.log
for /f %%i in (encode.log) do (  
    CScript /nologo encode.vbs %%i utf-8  
)
del encode.log



