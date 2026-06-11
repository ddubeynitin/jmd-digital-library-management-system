import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { FiCamera, FiStopCircle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'

const Scanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')
  const html5QrCodeRef = useRef(null)
  const scannerId = 'html5qr-code-full-region'

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current
          .stop()
          .catch(() => {})
          .finally(() => html5QrCodeRef.current?.clear())
      }
    }
  }, [])

  const handleScanSuccess = (decodedText) => {
    setScanResult(decodedText)
    onScan?.(decodedText)
    stopScanner()
  }

  const startScanner = async () => {
    setError('')
    if (isScanning) {
      return
    }

    try {
      const html5QrCode = new Html5Qrcode(scannerId)
      html5QrCodeRef.current = html5QrCode

      const devices = await Html5Qrcode.getCameras()
      if (!devices || devices.length === 0) {
        setError('No camera found. Please connect a camera and try again.')
        return
      }

      const cameraId = devices[0].id
      const config = {
        fps: 10,
        qrbox: { width: 280, height: 280 },
      }

      await html5QrCode.start(
        cameraId,
        config,
        (decodedText) => handleScanSuccess(decodedText),
      )

      setIsScanning(true)
      setError('')
    } catch (err) {
      setError(err?.message || 'Unable to start camera. Please allow camera permission and try again.')
    }
  }

  const stopScanner = async () => {
    if (!html5QrCodeRef.current) {
      setIsScanning(false)
      return
    }

    try {
      await html5QrCodeRef.current.stop()
      await html5QrCodeRef.current.clear()
    } catch (err) {
      // ignore stop errors
    } finally {
      html5QrCodeRef.current = null
      setIsScanning(false)
    }
  }

  return (
    <div className='space-y-5'>
      <div className='rounded-xl border border-gray-200 bg-white p-5 shadow-sm'>
        <div className='flex items-center justify-between gap-4'>
          <div>
            <h3 className='text-xl font-semibold text-slate-900'>Student QR Scanner</h3>
            <p className='text-sm text-slate-600'>Scan a student QR code to mark attendance in real time.</p>
          </div>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={startScanner}
              className='inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
            >
              <FiCamera className='h-4 w-4' />
              Start Scan
            </button>
            {isScanning && (
              <button
                type='button'
                onClick={stopScanner}
                className='inline-flex items-center gap-2 rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50'
              >
                <FiStopCircle className='h-4 w-4' />
                Stop
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className='mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700'>
            <FiAlertCircle className='h-4 w-4 shrink-0' />
            <span>{error}</span>
          </div>
        )}

        <div className='mt-5'>
          <div id={scannerId} className='mx-auto max-w-xl rounded-xl bg-black/5 p-2'></div>
        </div>

        <div className='mt-5 grid gap-3 sm:grid-cols-2'>
          <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-sm text-slate-500'>Current scan result</p>
            <p className='mt-2 min-h-[2rem] text-base font-medium text-slate-900'>
              {scanResult || 'Waiting for scan...' }
            </p>
          </div>
          <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <p className='text-sm text-slate-500'>Scanner status</p>
            <p className='mt-2 flex items-center gap-2 text-base font-medium text-slate-900'>
              {isScanning ? (
                <><FiCheckCircle className='h-4 w-4 text-emerald-500' /> Running</>
              ) : (
                <span className='text-slate-500'>Stopped</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scanner
