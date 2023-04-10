import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import ReactPlayer from 'react-player'

export default function WarriorPose() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Warrior Pose
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Watch video and then click "Do exercise" to continue
          </p>
        </div>
        <div className="container py-12">
          <div className="flex  items-center justify-center">
            <ReactPlayer url={`/static/warriorsample.mp4`} controls={true} />
            <button className="fixed bottom-10 right-10 m-4 rounded bg-blue-500 p-2 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Do exercise
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
