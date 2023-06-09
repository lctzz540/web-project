import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import exercisesData from '@/data/exercisesData'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ExercisePreview() {
  const router = useRouter()
  const { id } = router.query
  const [exercise, setExercise] = useState(null)

  useEffect(() => {
    if (!id) return

    const foundExercise = exercisesData.find((element) => element.id === id)

    if (!foundExercise) {
      router.replace('/404', undefined, { shallow: true })
    } else {
      setExercise(foundExercise)
    }
  }, [id])

  if (!exercise) {
    return null
  }

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {exercise.title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Watch video and then click "Do exercise" to continue
          </p>
          ) : (<></>
        </div>
        <div className="container py-12">
          <div className="flex  items-center justify-center">
            <>
              <ReactPlayer url={exercise.video} controls={true} />
              <Link
                className="fixed bottom-10 right-10 m-4 rounded bg-blue-500 p-2 py-2 px-4 font-bold text-white hover:bg-blue-700"
                href={'https://pose-dcnv.onrender.com'}
              >
                Do exercise
              </Link>
            </>
          </div>
        </div>
      </div>
    </>
  )
}
