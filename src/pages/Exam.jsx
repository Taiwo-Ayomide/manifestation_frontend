import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examApi } from '../services/api';

const Exam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(2700);  // 45 minutes
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime] = useState(Date.now());

  const handleError = (error) => {
    console.error('Error:', error);
    setError(error.response?.data?.message || 'An error occurred');
    if (error.response?.status === 401) {
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        const response = await examApi.getExam(examId);
        setExamData(response.data.data);
        setTimeLeft(response.data.data.duration);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Alert when 5 minutes remain
    if (timeLeft === 300) {
      alert('5 minutes remaining!');
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const goToNextQuestion = () => {
    if (currentQuestion < examData.totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const response = await examApi.submitExam(examId, answers, timeSpent);

      setIsSubmitted(true);
      alert(`Exam submitted successfully! Score: ${response.data.data.percentageScore}%`);

      navigate('/exam-result', {
        state: { result: response.data.data },
      });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion - 1) / examData?.totalQuestions) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading exam...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <fieldset className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        {/* Question Buttons */}
        <section className="flex flex-wrap justify-center gap-2 mb-8">
          {Array.from({ length: examData.totalQuestions }, (_, index) => (
            <button
              key={index}
              className="bg-red-500 text-white font-bold rounded-lg w-12 h-12 hover:bg-green-700"
              onClick={() => setCurrentQuestion(index + 1)}
              disabled={isSubmitted} // Disable after submission
            >
              {index + 1}
            </button>
          ))}
        </section>

        {/* Question Content & Timer */}
        <section className="bg-blue-300 p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <h1 className="uppercase font-bold text-lg">Duration: 45 minutes</h1>
            <div className="uppercase text-lg font-semibold">{formatTime(timeLeft)}</div>
          </div>

          {/* Current Question */}
          <div className="mb-6">
            <h2 className="font-bold text-xl">Question {currentQuestion}:</h2>
            <ul>
              <li className="list-none">{examData?.questions[currentQuestion - 1]?.text}</li>
            </ul>
            <span className="block mb-2">Choose the correct option</span>

            <ul className="leading-9">
              {examData?.questions[currentQuestion - 1]?.options.map((option, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`question-${currentQuestion}-option-${index}`}
                    name={`question-${currentQuestion}`}
                    checked={answers[currentQuestion - 1] === option.text}
                    onChange={() => handleAnswerChange(currentQuestion - 1, option.text)}
                    disabled={isSubmitted} // Disable after submission
                  />
                  <label htmlFor={`question-${currentQuestion}-option-${index}`} className="ml-2">
                    {option.text}
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
            <div className="text-right text-sm">{Math.floor(progress)}% completed</div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="bg-white text-black font-bold w-24 h-8 rounded-lg"
              onClick={goToPreviousQuestion}
              disabled={isSubmitted}
            >
              Previous
            </button>
            <button
              className="bg-white text-black font-bold w-24 h-8 rounded-lg"
              onClick={goToNextQuestion}
              disabled={isSubmitted}
            >
              Next
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              className="bg-red-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-green-700"
              onClick={handleSubmit}
              disabled={isSubmitted}
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
