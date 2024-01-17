export const fatDataList = () => {
  const inputData = {
    '2024-01-02': [
      // {
      //   scheduleDate: '2024-01-02',
      //   startTime: '09:00',
      //   endTime: '12:00',
      //   id: '1_20240102_0900_1200',
      //   scheduleId: 1,
      //   users: [
      //     { scheduleDetailsId: '1_20240102_0900_1200', userName: '区领导', userId: '7' },
      //     { scheduleDetailsId: '1_20240102_0900_1200', userName: '李小宁', userId: '8' }
      //   ]
      // },
      {
        scheduleDate: '2024-01-02',
        startTime: '12:00',
        endTime: '14:00',
        id: '1_20240102_1200_1400',
        scheduleId: 1,
        users: [
          { scheduleDetailsId: '1_20240102_1200_1400', userName: '邓青青', userId: '4' },
          { scheduleDetailsId: '1_20240102_1200_1400', userName: '唐相卫', userId: '5' }
        ]
      },
      {
        scheduleDate: '2024-01-02',
        startTime: '14:00',
        endTime: '16:00',
        id: '1_20240102_1400_1600',
        scheduleId: 1,
        users: [
          { scheduleDetailsId: '1_20240102_1400_1600', userName: '孙铭', userId: '1' },
          { scheduleDetailsId: '1_20240102_1400_1600', userName: '向文', userId: '9' }
        ]
      }
    ],
    '2024-01-01': [
      {
        scheduleDate: '2024-01-01',
        startTime: '09:00',
        endTime: '12:00',
        id: '1_20240101_0900_1200',
        scheduleId: 1,
        users: [
          { scheduleDetailsId: '1_20240101_0900_1200', userName: '王梅梅', userId: '3' },
          { scheduleDetailsId: '1_20240101_0900_1200', userName: '李小宁', userId: '8' }
        ]
      }
    ]
  }

  const formattedData = []

  for (const date in inputData) {
    const scheduleArray = inputData[date]

    scheduleArray.forEach((schedule) => {
      const startTime = schedule.startTime
      const endTime = schedule.endTime
      const timeRange = `${startTime}-${endTime}`

      // Check if timeRange already exists in formattedData
      const existingTimeObject = formattedData.find((item) => item.time === timeRange)

      // If the timeRange doesn't exist, create a new timeObject
      if (!existingTimeObject) {
        const newTimeObject = {
          time: timeRange,
          data: [
            {
              date: schedule.scheduleDate,
              time: timeRange,
              userName: schedule.users.map((user) => user.userName)
            }
          ]
        }
        formattedData.push(newTimeObject)
      } else {
        // If the timeRange already exists, add data to the existing timeObject
        existingTimeObject.data.push({
          date: schedule.scheduleDate,
          time: timeRange,
          userName: schedule.users.map((user) => user.userName)
        })
      }
    })
  }

  formattedData.sort((a, b) => {
    const dateA = a.data[0].date
    const dateB = b.data[0].date
    const timeA = a.time
    const timeB = b.time

    if (dateA !== dateB) {
      return dateA.localeCompare(dateB)
    } else {
      return timeA.localeCompare(timeB)
    }
  })

  // 提取所有日期
  const dates = Object.keys(inputData).sort()

  // return [dates, dataArray]
  return {
    dates: dates,
    dataList: formattedData
  }
}
