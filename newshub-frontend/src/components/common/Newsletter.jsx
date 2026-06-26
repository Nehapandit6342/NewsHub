import { useState } from "react";
import { subscribeUser } from "../../api/subscriber.api";


export default function Newsletter() {

  const [email, setEmail] = useState("");


  const handleSubmit = async () => {

    try {

      await subscribeUser(email);

      alert("Subscribed successfully!");

      setEmail("");

    } catch (error) {

      alert(
        error.response?.data?.message || "Something went wrong"
      );

    }

  };


  return (
    <section className="my-10">

      <div
        className="
          max-w-2xl
          mx-auto
          text-center
          rounded-2xl
          bg-black
          px-6
          py-8
          shadow-lg
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-white
            mb-3
          "
        >
          Stay Updated With
          <span className="text-orange-500">
            {" "}NewsHub 📰
          </span>
        </h2>


        <p
          className="
            text-gray-300
            text-sm
            mb-5
          "
        >
          Get the latest news and updates directly in your inbox.
        </p>


        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="
            w-full
            px-4
            py-3
            rounded-lg
            text-black
            text-sm
            mb-3
            outline-none
          "
        />


        <button
          onClick={handleSubmit}
          className="
            w-full
            py-3
            rounded-lg
            bg-red-600
            text-white
            font-semibold
            hover:bg-red-700
            transition
          "
        >
          Subscribe
        </button>


        <p
          className="
            text-gray-400
            text-xs
            mt-4
          "
        >
          No spam. Only important news.
        </p>


      </div>

    </section>
  );
}