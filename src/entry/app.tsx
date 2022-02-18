import React, { useEffect, useState } from 'react'

export default (): JSX.Element => {
  const [test, setTest] = useState<string>()

  useEffect(() => {
    setTest('hallo world')
  })

  return <>{test}</>
}
