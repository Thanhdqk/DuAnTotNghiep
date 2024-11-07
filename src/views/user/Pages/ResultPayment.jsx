
import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';

const ResultPayment = () => {
    const token = localStorage.getItem('paypal_token');
    const [iserror, setiserror] = useState(false);
    const paypal_order_id = localStorage.getItem('paypal_order_id');
    console.log(paypal_order_id);
    const capturepaymentfororder = async (orderid) => {
        console.log('run authorize');
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypal_order_id}/authorize `,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }, data: {

            }
        }).catch((err) => {
            console.log('error', err);
            if (err.status != 201) {
                setiserror(true);
            }

        });
        console.log(res.data.purchase_units[0].payments.authorizations[0].id);
        if (res.status == 201) {
            let id = "dh-" + res.data.id;
            updateStatus(id);
        }
        details_for_authorized_payment(res.data.purchase_units[0].payments.authorizations[0].id);


    }

    const updateStatus = async (id) => {
        const res = await axios({ url: `http://localhost:8080/updatestatus?id=${id}`, method: 'PUT' });
    }
    const details_for_authorized_payment = async (id) => {
        console.log("run get details");
        const res = await axios({
            url: `https://api-m.sandbox.paypal.com/v2/payments/authorizations/${id}`,
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data.links.find(link => link.rel === "capture").href)
        Capture_authorized_payment(res.data.links.find(link => link.rel === "capture").href);
    }



    const Capture_authorized_payment = async (url) => {
        console.log('run capture');
        const res = await axios({
            url: `${url}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'POST', data: {

            }


        });
    }

    useEffect(() => {
        capturepaymentfororder();
    }, [iserror])

    return (
        <>  <div>{iserror ? 'Thanh toán thất bại' : 'thanh toán thành công'}</div></>
    )
}

export default ResultPayment