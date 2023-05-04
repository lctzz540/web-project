import React, { useState } from 'react'
import { questions } from '@/data/bdi-ii'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

function BDIQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [stress, setStress] = useState()

  const handleAnswerOptionClick = (scoreOfthisQuestion) => {
    setScore(score + scoreOfthisQuestion)

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      if (score < 11) {
        setStress('Bình thường, không có vấn đề về tâm lý')
      } else {
        if (score < 17) {
          setStress('Xáo trộn tâm trạng nhẹ nhàng')
        } else {
          if (score < 21) {
            setStress('Trầm cảm nhẹ')
          } else {
            if (score < 31) {
              setStress('Trầm cảm ở mức trung bình')
            } else {
              setStress('Trầm cảm nặng')
            }
          }
        }
      }
      setShowScore(true)
    }
  }

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Đánh giá mức độ stress dựa trên thang đánh giá trầm cảm Beck (BDI)
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Hiện nay càng ngày càng xảy ra nhiều sự việc đáng buồn xảy ra liên quan đến vấn đề
            stress nói chung và trong độ tuổi thanh thiếu niên nói riêng. Bởi thế nên việc phát hiện
            và giải quyết những vấn đề tâm lý của stress kịp thời là một sự cần thiết để giúp người
            bị trầm cảm nhận ra và tìm được sự giúp đỡ của mọi người
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl bg-white py-12 px-4 dark:bg-gray-800 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {showScore ? (
            <div className="rounded-lg bg-green-200 p-8 text-green-800 shadow-md">
              <h2 className="mb-4 text-3xl font-bold">Tình trạng hiện tại: {stress}</h2>
              <p className="text-5xl font-bold">Score: {score}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                {questions[currentQuestion].answerOptions.map((answerOption) => (
                  <button
                    key={answerOption.score}
                    className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                    onClick={() => handleAnswerOptionClick(answerOption.score)}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BDIQuiz
