import React, { useState, useEffect } from 'react';

const Exam = () => {
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState(new Array(4).fill(null)); // assuming 4 questions
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Alert when it is 5 minutes to finished time
    if (timeLeft === 300) {
      alert('5 minutes remaining!');
    }

    return () => clearInterval(timer); // Clean up on unmount
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const goToNextQuestion = () => {
    if (currentQuestion < 4) setCurrentQuestion(currentQuestion + 1);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    alert('Your exam has been submitted!');
  };

  const progress = (currentQuestion - 1) * 25;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <fieldset className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* First Section: Question Buttons */}
        <section className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              key={index}
              className="bg-red-500 text-white font-bold rounded-lg w-12 h-12 hover:bg-green-700"
              onClick={() => setCurrentQuestion(index + 1)}
              disabled={isSubmitted} // Disable buttons after submission
            >
              {index + 1}
            </button>
          ))}
        </section>

        {/* Second Section: Question Content & Timer */}
        <section className="bg-blue-300 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <h1 className="uppercase font-bold text-lg">Duration: 45 minutes</h1>
            <div className="uppercase text-lg font-semibold">{formatTime(timeLeft)}</div>
          </div>

          <div className="mb-6">
            <h2 className="font-bold text-xl">Question {currentQuestion}:</h2>
            <ul>
              <li className="list-none">What is the situation of the country right now to you?</li>
            </ul>
            <span className="block mb-2">Choose the right option</span>

            <ul className="leading-9">
              {['Pleasant', 'Nothing happened', 'Not Pleasant', 'I am managing'].map((option, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`question-${currentQuestion}-option-${index}`}
                    name={`question-${currentQuestion}`}
                    checked={answers[currentQuestion - 1] === option}
                    onChange={() => handleAnswerChange(currentQuestion - 1, option)}
                    disabled={isSubmitted} // Disable options after submission
                  />
                  <label htmlFor={`question-${currentQuestion}-option-${index}`} className="ml-2">
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Progress</label>
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-green-500 h-2"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm">{progress}% completed</div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-white text-black font-bold w-24 h-8 rounded-lg"
              onClick={goToPreviousQuestion}
              disabled={isSubmitted} // Disable navigation after submission
            >
              Previous
            </button>
            <button
              className="bg-white text-black font-bold w-24 h-8 rounded-lg"
              onClick={goToNextQuestion}
              disabled={isSubmitted} // Disable navigation after submission
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-red-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-green-700"
              onClick={handleSubmit}
              disabled={isSubmitted} // Disable submit button after submission
            >
              Submit
            </button>
          </div>
        </section>
      </fieldset>
    </div>
  );
};

export default Exam;
