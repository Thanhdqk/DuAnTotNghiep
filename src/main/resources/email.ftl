<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Java Techie Mail</title>
        <link href='https://fonts.googleapis.com/css?family=League Gothic' rel='stylesheet'>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
            crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    </head>
    <style>
        table,
        th,
        td {
            border: 1px solid black;
        }
    </style>

    <body style="  font-family: 'League Gothic';font-size: 22px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td align="center" valign="top" bgcolor="#838383"
                    style="background-image: linear-gradient(to right bottom, #6d94d0, #238cad, #1f7d7e, #3d6a53, #4c5537);">
                    <br> <br>
                    <table width="600" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td align="center"
                                valign="top" bgcolor="#d3be6c"
                                style=" border-radius: 10px; border: 2px solid ;  background-color: white; opacity: 0.6;  font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000; padding: 0px 15px 10px 15px;">
                                <div style="font-size: 48px; color:#000000;">
                                    <b class="text-danger">Bạn đã đặt mua hàng với mã đơn là ${donhangid}</b>
                                </div>
                                <table style=" width:100%; border:1px solid black;">
                                    <tr style="  border:1px solid black;">
                                        <th style="  border:1px solid black;">Sản phẩm</th>
                                    </tr>
                                    <#list products as sp>
                                        <tr>
                                            <td>
                                                <p style=" font-size: 18.5px;">${sp}
                                            </td>
                                        </tr>
                                    </#list>
                                </table>
                                <div style="font-size: 24px; color: #555100;">
                                    <br>Phí ship : ${shippingfee} 
                                </div>
                                <div style="font-size: 24px; color: #555100;">
                                    <br> Tổng tiền đơn hàng : ${tongtien} 
                                </div>
                                <div style="font-size: 24px; color: #555100;">
                                    <br> Phương thức thanh toán : ${PayMentMethod}
                                </div>
                                <div style="font-size: 24px; color: #555100;">
                                    <br>Thời gian giao hàng dự kiến : ${estimateddate} 
                            </td>
                        </tr>
                    </table>
                    <br>
                    <br>
                </td>
            </tr>
        </table>
    </body>

    </html>
</body>

</html>