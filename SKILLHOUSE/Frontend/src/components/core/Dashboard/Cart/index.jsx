import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="bg-indigo-900 rounded-2xl p-8 shadow-2xl">
      <h1 className="mb-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-indigo-400 to-purple-400 text-center drop-shadow-lg">My Cart</h1>
      <p className="border-b border-b-yellow-400 pb-2 font-semibold text-yellow-300 text-lg text-center mb-6">
        {totalItems} Course{totalItems !== 1 ? 's' : ''} in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-2xl text-indigo-200 font-semibold">
          Your cart is empty
        </p>
      )}
    </div>
  )
}