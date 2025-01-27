import React from 'react'

const Cart = () => {
  return (
    <div dir="rtl">
      <div className="bg-gray-100">
        <div className="mx-auto">
          <div className="md:flex">

            {/* Items  */}
            <div className="md:w-3/4 w-full bg-white md:px-5 px-2 py-5">
              <div className="flex justify-between border-b pb-5">
                <h1 className="font-semibold text-2xl">سبد خرید</h1>
                <h2 className="font-semibold text-2xl">3 سفارش</h2>
              </div>
              <div className="flex mt-5 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs selection: uppercase w-2/5">جزئیات</h3>
                <h3 className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">تعداد</h3>
                <h3 className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">قیمت</h3>
                <h3 className="font-semibold text-gray-600 text-xs selection:uppercase w-2/5 text-center">مجموع</h3>
              </div>

              <div className="h-screen no-scrollbar overflow-y-scroll overflow-x-hidden w-full">
                {
                  orders.length > 0 ?
                    orders.map(order => (
                      <Card order={order} key={order.id} />
                    )) :
                    <div className="text-center items-center">
                      <img className="m-auto" src="/img/emptyCart.png" alt="EmptyCart" />
                      <h2 className="text-gray-600 font-bold">سبد خرید شما خالی میباشد</h2>
                    </div>
                }
              </div>
            </div>

            {/* Right Box  */}
            <div className="md:w-1/4 px-5 py-5">
              <h1 className="font-semibold text-2xl border-b pb-5">سفارشات</h1>

              <div className="py-10">
                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">کد پستی</label>
                <input type="text" id="promo" placeholder="کد پستی خود را وارد کنید" className="p-2 text-sm w-full" />
              </div>
              <button className="bg-sky-500 hover:bg-sky-600 px-5 py-2 text-sm text-white uppercase">بررسی</button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>مجموع سفارشات</span>
                  <span>{cart.total_amount}</span>
                </div>
                <button className="bg-sky-600 font-semibold hover:bg-sky-700 py-3 text-sm text-white uppercase w-full">پرداخت و ثبت سفارش</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart