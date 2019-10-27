import { Order } from '@libs/order';
import ReactDOM from 'react-dom';
import React from 'react';
import dayjs from 'dayjs';
import 'src/styles/index.scss';

const FONT_SIZE = 12;
const center: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
};

export const HalfA4Report = (props: {
  order: Order;
  page: number;
  totalPage: number;
  totalPrice: number;
}) => {
  const { order } = props;
  const totalPrice = order.items.reduce<number>((price, item) => {
    if (item.name && item.quantity && item.unitPrice) {
      return price + item.quantity * item.unitPrice;
    }
    return price;
  }, 0);
  return (
    <div
      className="half-a4"
      style={{
        width: '100%',
        height: '61vw',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginBottom: props.page === props.totalPage ? 0 : 15
      }}
    >
      <div style={{ textAlign: 'center', fontSize: '18pt' }}>
        {order.companyName}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ ...center, flex: '0 0 30%', fontSize: `${FONT_SIZE}pt` }}>
          <div>{order.companyAddress}</div>
          <div>{order.companyPhone}</div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '18pt' }}>出貨單</div>
        <div
          style={{
            ...center,
            flex: '0 0 30%',
            textAlign: 'right',
            fontSize: `${FONT_SIZE}pt`
          }}
        >
          <div>
            頁次: {props.page}/{props.totalPage}
          </div>
          <div>出貨日期: {dayjs(order.date).format('YYYY/MM/DD')}</div>
        </div>
      </div>
      <div
        className="bf fc"
        style={{ fontSize: `${FONT_SIZE}pt`, flex: '1 1 0' }}
      >
        <div className="bb" style={{ display: 'flex' }}>
          <div className="br p3">客戶寶號</div>
          <div style={{ flex: '1 1 0' }} className="br p3">
            {order.customerName}
          </div>
          <div className="br p3">客戶地址</div>
          <div className="p3" style={{ flex: '1 1 0' }}>
            {order.customerAddress}
          </div>
        </div>
        <div style={{ display: 'flex', flex: '1 1 0' }}>
          <div className="fc" style={{ flex: '1 1 0' }}>
            <div className="item bb">
              <div>
                <div>品項</div>
                {order.items.map((x, i) => (
                  <div key={i}>{x.name}</div>
                ))}
              </div>
              <div>
                <div>單位</div>
                {order.items.map((x, i) => (
                  <div key={i}>{x.unit}</div>
                ))}
              </div>
              <div>
                <div>單價</div>
                {order.items.map((x, i) => (
                  <div key={i}>{x.unitPrice}</div>
                ))}
              </div>
              <div>
                <div>數量</div>
                {order.items.map((x, i) => (
                  <div key={i}>{x.quantity}</div>
                ))}
              </div>
              <div>
                <div>小計</div>
                {order.items.map((x, i) => (
                  <div key={i}>{(x.quantity * x.unitPrice).toFixed(2)}</div>
                ))}
              </div>
            </div>
            <div
              className="p3"
              style={{ ...center, textAlign: 'right', flex: '1 1 0' }}
            >
              本單金額: {totalPrice.toFixed(0)}, 總金額:{' '}
              {props.totalPrice.toFixed(0)}
            </div>
          </div>
          <div
            style={{
              flex: '0 0 20%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
            className="bl"
          >
            <div style={{ flex: '1 1 0', width: '100%' }}>
              <div className="tc bb p3">備註</div>
            </div>
            <div style={{ flex: '1 1 0', width: '100%' }}>
              <div className="tc by p3">客戶簽章</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const createHalfA4Report = (order: Order) => {
  const re = window.open('', '', 'width=1000,height=500');
  if (!re) {
    throw 'Window open failed';
  }
  const el = document.createElement('div');
  const orderSplit: Order[] = [];
  for (let i = 0; i < order.items.length; i += 12) {
    orderSplit.push({ ...order, items: order.items.slice(i, i + 12) });
  }
  const totalPrice = order.items.reduce<number>((price, item) => {
    if (item.name && item.quantity && item.unitPrice) {
      return price + item.quantity * item.unitPrice;
    }
    return price;
  }, 0);
  ReactDOM.render(
    <>
      {orderSplit.map((x, i) => (
        <HalfA4Report
          order={x}
          key={i}
          totalPrice={totalPrice}
          totalPage={orderSplit.length}
          page={i + 1}
        />
      ))}
    </>,
    el
  );
  re.document.body.appendChild(el);
  const style = document.createElement('style');
  style.innerHTML = `.half-a4 .bt {
    border-top: 1px solid black;
 }
  .half-a4 .bb {
    border-bottom: 1px solid black;
 }
  .half-a4 .br {
    border-right: 1px solid black;
 }
  .half-a4 .bl {
    border-left: 1px solid black;
 }
  .half-a4 .bx {
    border-right: 1px solid black;
    border-left: 1px solid black;
 }
  .half-a4 .by {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
 }
  .half-a4 .bf {
    border: 1px solid black;
 }
  .half-a4 .p3 {
    padding: 3px;
 }
  .half-a4 .fc {
    display: flex;
    flex-direction: column;
 }
  .half-a4 .tc {
    text-align: center;
 }
  .half-a4 .item {
    display: flex;
    flex: 0 0 326px;
 }
  .half-a4 .item > div:nth-child(1) {
    width: 40%;
 }
  .half-a4 .item > div:nth-child(2) {
    width: 10%;
 }
  .half-a4 .item > div:nth-child(3) {
    width: 10%;
 }
  .half-a4 .item > div:nth-child(4) {
    width: 20%;
 }
  .half-a4 .item > div:nth-child(5) {
    border-right: none;
    width: 20%;
 }
  .half-a4 .item > div {
    border-right: 1px solid black;
    height: 100%;
 }
  .half-a4 .item > div > div:nth-child(13) {
    border-bottom: none;
 }
  .half-a4 .item > div > div {
    border-bottom: 1px solid black;
    padding: 3px;
    height: 18px; 
 }
 body{
   margin: 0;
   box-sizing: border-box;
   font-weight: 600;
 }
  `;
  re.document.head.appendChild(style);
  setTimeout(() => {
    re.print();
  }, 500);
  // re.onfocus = () => {
  //   setTimeout(() => {
  //     re.close();
  //   }, 500);
  // };
};
