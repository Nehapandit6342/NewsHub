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

import { toast } from "react-toastify";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    console.log("Subscribe clicked");

    try {
      await subscribeUser(email);

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.log("ERROR:", error);
      console.log("BACKEND MESSAGE:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="my-16 px-4">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-md p-8 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Stay Updated <span className="text-red-600">📰</span>
          </h2>

          <p>
            Get breaking news and weekly highlights delivered directly to your
            inbox.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
flex-1
px-4
py-3
rounded-xl
border
border-gray-300
dark:border-gray-600
bg-white
dark:bg-gray-800
text-gray-900
dark:text-white
placeholder-gray-400
dark:placeholder-gray-500
focus:outline-none
focus:ring-2
focus:ring-red-500
"
          />

          <button
            onClick={handleSubmit}
            className="
              px-8
              py-3
              rounded-xl
              bg-red-600
              text-white
              font-semibold
              hover:bg-red-700
              transition
            "
          >
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400 dark:text-gray-500">
          No spam • Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}

