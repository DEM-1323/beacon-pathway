"use client";

import { useState } from "react";
import Link from "next/link";

// Sample quiz questions - these would be fetched from Supabase in a real implementation
const quizQuestions = [
  {
    id: 1,
    question: "What academic subjects are you most interested in?",
    options: [
      "Computer Science and Technology",
      "Business and Economics",
      "Arts and Humanities",
      "Science and Mathematics",
      "Health and Medicine",
      "Social Sciences",
    ],
  },
  {
    id: 2,
    question: "What type of work environment do you prefer?",
    options: [
      "Office setting with structured hours",
      "Remote work with flexible schedule",
      "Active environment with movement",
      "Creative space with collaborative projects",
      "Outdoors and field work",
      "Mix of different environments",
    ],
  },
  {
    id: 3,
    question: "What skills would you like to develop further?",
    options: [
      "Technical skills (coding, data analysis)",
      "Communication and presentation",
      "Leadership and management",
      "Creative skills (design, writing)",
      "Research and analysis",
      "Problem-solving and critical thinking",
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, string>
  >({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [quizQuestions[currentQuestion].id]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      // In a real implementation, we would save the results to Supabase here
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Quiz Completed!
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Thank you for completing the pathway assessment quiz. Based on your
            responses, we've identified some potential pathways for you.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Your Top Matches</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3">
                  1
                </span>
                <span>Software Development</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3">
                  2
                </span>
                <span>Data Science and Analytics</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3">
                  3
                </span>
                <span>UX/UI Design</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between">
            <Link
              href="/opportunities"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Explore Related Opportunities
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Pathway Assessment Quiz</h1>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${
                  ((currentQuestion + 1) / quizQuestions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {quizQuestions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`p-4 border rounded-md cursor-pointer transition ${
                  selectedOptions[quizQuestions[currentQuestion].id] === option
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOptions[quizQuestions[currentQuestion].id]}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
