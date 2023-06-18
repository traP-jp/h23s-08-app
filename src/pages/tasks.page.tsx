import { BsFillPenFill } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import Link from 'next/link'
import styled from '@emotion/styled'
import React, { useRef, useState, useEffect, ComponentProps } from 'react'
import dayjs from 'dayjs'

interface Task {
  taskID: number
  taskName: string
  taskDue: dayjs.Dayjs
}
const tasks = [
  {
    taskID: 0,
    taskName: '課題１ですよーーーーーーーーーーーーー',
    taskDue: dayjs('2023-06-18 06:00:00'),
  },
  {
    taskID: 1,
    taskName: '課題２',
    taskDue: dayjs('2023-06-23 12:00:00'),
  },
  {
    taskID: 2,
    taskName: '課題３',
    taskDue: dayjs('2023-06-30 00:00:00'),
  },
]

function LeftArrowButton() {
  return (
    <Link href='/'>
      <IconContext.Provider value={{ size: '40px', color: '#fff' }}>
        <AiOutlineArrowLeft />
      </IconContext.Provider>
    </Link>
  )
}

interface TextProps extends ComponentProps<'span'> {
  children: string
}
const OmitSpan = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
`
function Text(props: TextProps) {
  const refOuter = useRef<HTMLSpanElement>(null)
  const refInner = useRef<HTMLSpanElement>(null)
  // 省略表記のとき true
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false)
  // リサイズ監視
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const rectOuter = refOuter.current?.getBoundingClientRect()
      const rectInner = refInner.current?.getBoundingClientRect()
      // 外枠 < 内枠 なら省略表記
      setIsEllipsis((rectOuter?.width ?? 0) < (rectInner?.width ?? 0))
    })
    const el = refOuter.current as Element
    resizeObserver.observe(el)
    return () => resizeObserver.unobserve(el)
  })

  const { children, ...etc } = props
  // 省略表記になるとき title を設定
  const title = isEllipsis && { title: children }
  return (
    <OmitSpan ref={refOuter} {...etc}>
      <span ref={refInner} {...title}>
        {children}
      </span>
    </OmitSpan>
  )
}

const TaskBottomButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 210px;
`
const TaskBottomButtonChild = styled.div`
  background: #bf5745;
  width: 3px;
  height: 10px;
`
const TextButton = styled.button`
  margin-top: 20px;
  color: #fff;
  background: #bf5745;
  width: 180px;
  height: 50px;
  text-align: center;
`
const DueButton = styled.button`
  color: #fff;
  background: #bf5745;
  width: 210px;
  height: 30px;
  font-size: 10px;
  text-align: right;
`

const DisplayGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
`

const EditBack = styled.div`
  margin-top: 20px;
  background: #bf5745;
  height: 50px;
`
const DivMargin = styled.div`
  margin-top: 10px;
`
function EditButton() {
  return (
    <EditBack>
      <DivMargin>
        <Link href='/'>
          <IconContext.Provider value={{ color: '#fff' }}>
            <BsFillPenFill />
          </IconContext.Provider>
        </Link>
      </DivMargin>
    </EditBack>
  )
}
function TaskButton(props: { taskTitle: string; taskDue: dayjs.Dayjs }) {
  return (
    <>
      <DisplayGrid>
        <TextButton>
          <Text>{props.taskTitle}</Text>
        </TextButton>
        <EditButton />
      </DisplayGrid>
      <div>
        <DueButton>{props.taskDue.format('YYYY年M月D日 HH:mm　')}</DueButton>
        <TaskBottomButton>
          <TaskBottomButtonChild />
          <TaskBottomButtonChild />
        </TaskBottomButton>
      </div>
    </>
  )
}

function TaskList(props: { taskList: Task[] }) {
  return (
    <div>
      {props.taskList.map(task => (
        <div key={task.taskID}>
          <TaskButton taskTitle={task.taskName} taskDue={task.taskDue} />
        </div>
      ))}
    </div>
  )
}
const Back = styled.div`
  background-color: #1b2668;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
`
export default function Tasks() {
  return (
    <Back>
      <LeftArrowButton />
      <Center>
        <TaskList taskList={tasks} />
      </Center>
    </Back>
  )
}
