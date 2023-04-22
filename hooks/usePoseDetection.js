import * as poseDetection from '@mediapipe/pose'
import { useEffect, useState } from 'react'

const usePoseDetection = (videoRef) => {
  const [poseData, setPoseData] = useState(null)

  useEffect(() => {
    const runPoseDetection = async () => {
      const pose = new poseDetection.Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        },
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const drawFrame = async () => {
        if (!videoRef.current || !pose) {
          return
        }

        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

        const poseResult = await pose.estimateSinglePose(canvas, {
          flipHorizontal: false,
        })

        setPoseData(poseResult)

        requestAnimationFrame(drawFrame)
      }

      drawFrame()
    }

    runPoseDetection()
  }, [videoRef])

  useEffect(() => {
    if (poseData) {
      const poseCoords = poseData.poseLandmarks.flat().map((lm) => lm.toFixed(2))

      const csvContent = `data:text/csv;charset=utf-8,${poseCoords.join(',')}\n`

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'pose.csv')
      document.body.appendChild(link)

      link.click()
    }
  }, [poseData])

  return poseData
}

export default usePoseDetection
