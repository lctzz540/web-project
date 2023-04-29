import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Pose } from '@mediapipe/pose'
import Webcam from 'react-webcam'
import tw from 'tailwind-styled-components'

const RecordButton = tw.button`
  bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded
`

const StopButton = tw.button`
  bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
`

const DownloadButton = tw.button`
  bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
`

const ClockText = tw.span`
  text-4xl font-bold text-white
`

export default function WebcamVideo() {
  const webcamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const [capturing, setCapturing] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([])
  const [recordTime, setRecordTime] = useState(0)
  const [pose, setPose] = useState(null)
  const poseRef = useRef(null)

  const onPoseDetection = (results) => {
    const landmarks = results.poseLandmarks

    if (landmarks) {
      setPose(landmarks)
    }
  }

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data))
    }
  }, [])

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true)
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/mp4',
    })
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable)
    mediaRecorderRef.current.start()
  }, [webcamRef, handleDataAvailable])

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop()
    setCapturing(false)
  }, [])

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      a.href = url
      a.download = 'react-webcam-stream-capture.mp4'
      a.click()
      window.URL.revokeObjectURL(url)
      setRecordedChunks([])
    }
  }, [recordedChunks])

  useEffect(() => {
    let interval
    if (capturing) {
      interval = setInterval(() => {
        if (recordTime === 30) {
          handleStopCaptureClick()
        } else {
          setRecordTime((prevTime) => prevTime + 1)
        }
      }, 1000)
    } else {
      setRecordTime(0)
    }
    return () => clearInterval(interval)
  }, [capturing, handleStopCaptureClick, recordTime])

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  useEffect(() => {
    const poseInstance = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
      },
    })
    poseInstance.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })
    poseInstance.onResults(onPoseDetection)
    poseInstance.onResults((results) => {
      poseRef.current = results.poseLandmarks
    })
    poseInstance.initialize()

    return () => {
      poseInstance.close()
    }
  }, [])
  const [videoHeight, setVideoHeight] = useState(0)
  const [videoWidth, setVideoWidth] = useState(0)

  useLayoutEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video
      setVideoHeight(video.videoHeight / video.height)
      setVideoWidth(video.videoWidth / video.width)
    }
  }, [])

  return (
    <div className="Container">
      <Webcam
        height={1280}
        width={720}
        audio={false}
        mirrored={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      {capturing ? (
        <>
          <StopButton onClick={handleStopCaptureClick}>Stop Capture</StopButton>
          <div>{recordTime}s</div>
        </>
      ) : (
        <RecordButton onClick={handleStartCaptureClick}>Start Capture</RecordButton>
      )}
      {recordedChunks.length > 0 && !capturing && (
        <DownloadButton onClick={handleDownload}>Download</DownloadButton>
      )}
      {pose && (
        <>
          {pose.landmark.map((landmark, index) => {
            return (
              <div
                key={`landmark-${index}`}
                style={{
                  position: 'absolute',
                  top: `${landmark.y * videoHeight}px`,
                  left: `${landmark.x * videoWidth}px`,
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                }}
              ></div>
            )
          })}
        </>
      )}
    </div>
  )
}
