import styled from '@emotion/styled'
import { ComponentProps } from 'react'


const Xbutton = styled.button`
    color: #fff;
    font-size: 40px;
`

const TaskBottomButton = styled.div`
    display: flex;
    justify-content: space-between;
    width: 140px;
`
const TaskBottomButtonChild  = styled.div`
    background: #BF5745;
    width: 3px;
    height: 10px;
    
`
const TextButton = styled.button`
    margin-top: 20px;
    color: #fff;
    background: #BF5745;
    padding: 10px 30px;
`

type Props = ComponentProps<'button'>
function TaskButton(props: Props){
    return (
        <div>
            <TextButton {...props}>タスク管理</TextButton>
            <TaskBottomButton>
                <TaskBottomButtonChild />
                <TaskBottomButtonChild />
            </TaskBottomButton>
        </div>
    )
}

const Line = styled.hr`
    background-color: #fff;
    height: 2px;
    margin-top: 20px;
`
const GroupButton = styled.button`
    background: #fff;
    border: 3px solid #BF5745;
    color: #1B2668;
    border-radius: 10px;
    padding: 10px 30px;
    margin-top: 5px;
`
function GroupList(props: { groupList: string[]; }){
    return (
        <div>
            {props.groupList.map(group => (<div key={group}><GroupButton>{group}</GroupButton></div>))}
        </div>
    )
}

const Back = styled.div`
    background-color: #1B2668;
`
const Center = styled.div`
    display: flex;
    justify-content: center;
`
const isLogin=true;
export default function Sidebar(){
    return (
        <Back>
            <Xbutton>×</Xbutton>
            <Center>
                <TaskButton onClick={() => {
                    alert('You Clicked Task Button!')
                }}/>
            </Center>
            <Line />
            {isLogin ? 
            (
                <div>
                    <Center>
                        <GroupList groupList={["グループ1", "グループ2", "グループ3"]}/>
                    </Center>
                    <Center>
                        <TextButton onClick={() => {
                            alert('You Clicked Add Group Button!')
                        }}>＋ グループ追加</TextButton>
                    </Center>
                </div>
            ):(
                <div>
                    <Center>
                        <TextButton onClick={() => {
                            alert('You Clicked Login Button!')
                        }}>ログイン</TextButton>
                        
                    </Center>
                </div>
            )
            }
        </Back>
    )
}