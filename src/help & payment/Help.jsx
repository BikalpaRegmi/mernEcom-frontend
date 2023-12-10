import React, { useState } from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { Link } from 'react-router-dom';

const Help = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'How to sell a product ?', answer: false },
    { id: 2, question: 'How to contact with admin ?', answer: false },
    { id: 3, question: 'Is this site trusted ?', answer: false },
  ]);

  const handleQuery = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, answer: !q.answer } : q
      )
    );
  };

  return (
    <div>
      <h1 className='text-red-700 text-5xl text-bold font-serif bg-slate-50 w-80 text-center mx-auto shadow-sm mt-7'>Help Center</h1>
      <h1 className='text-red-700 text-3xl text-bold font-mono bg-slate-50 w-10/12 text-center mx-auto shadow-sm mt-7 capitalize'>answer's of some of your queries</h1>

      <div className="questions mt-9">
        {questions.map((q) => (
          <div key={q.id}>
            <p className={`text-3xl flex gap-3 hover:bg-slate-300 bg-slate-50 cursor-pointer mt-3 pl-7`} onClick={() => handleQuery(q.id)}>
              {q.question} {q.answer ? <GoTriangleUp /> : <GoTriangleDown />}
            </p>
            {q.answer && (
              <p className='font-light mx-3 text-lg bg-slate-100 text-black'>
                {q.question === 'How to sell a product ?' && (
                  <>
                    You can easily upload or add your product and sell it by following these steps:
                    <br />
                    Step I: <Link to={'/sellers'} className='text-blue-700 underline'>Click here</Link> or go to the home page and click on "Become a seller" at the top.
                    <br />
                    Step II: Fill out the form.
                    <br />
                    Step III: Submit the product you created.
                    <br />
                    Step IV: Go to the necessary category or search for your product for confirmation.
                  </>
                )}
                {q.question === 'How to contact with admin ?' && (
                  <>
                    You can easily contact the admin by following these steps:
                    <br />
                    Step I: Go to the very bottom of any page.
                    <br />
                    Step II: You will see a footer titled "Bikalpa E-commerce."
                    <br />
                    Step III: At the bottom right of that footer, you will see different social media icons.
                    <br />
                    Step IV: You can also find the email address on the same footer.
                    <br />
                    Step V: You can directly email or select a social media platform to contact the admin.
                  </>
                )}
                {q.question === 'Is this site trusted ?' && (
                  <>
                    This site is fully trusted. We have been working on this site for a couple of years, and there have been no difficulties for our customers.
                    <br />
                    You can easily get a refund for bad responses or a gift voucher. We always remove sellers who engage in scams.
                  </>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;
