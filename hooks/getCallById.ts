'use client'

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallByID = (id: string | string[]) => {
  const [call, setCall] = useState<Call>()
  const [isCallLoading, setisCallLoading] = useState<boolean>(true)

  const client = useStreamVideoClient()

  useEffect(() => {
    if (!client) {
      return
    }
    // * if client exists
    const loadeCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id
        }
      })
      if (calls.length > 0) {
        setCall(calls[0])
      }
      setisCallLoading(false)
    }
    loadeCall()
  }, [client, id])

  return { isCallLoading, call }
}
