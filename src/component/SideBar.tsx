import styled from '@emotion/styled'


const Xbutton = styled.button`
    color: #fff;
    font-size: 40px;
`
function Closebutton(){
    return <Xbutton>×</Xbutton>;
}

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

function TaskButton(){
    return (
        <div>
            <TextButton>タスク管理</TextButton>
            <TaskBottomButton>
                <TaskBottomButtonChild />
                <TaskBottomButtonChild />
            </TaskBottomButton>
        </div>
    )
}
function AddGroupButton(props: { isLogin: boolean; }){
    const text = props.isLogin ? "＋ グループ追加" : "ログイン";
    return (
        <TextButton>{text}</TextButton>
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
    const items=[];
    for (let i=0; i<props.groupList.length;i++){
        items.push(<div><GroupButton>{props.groupList[i]}</GroupButton></div>)
    }
    return <div>{items}</div>;
}

const Back = styled.div`
    background-color: #1B2668;
`
const Center = styled.div`
    display: flex;
    justify-content: center;
`
export default function Sidebar(){
    return (
        <Back>
            <div>
                <Closebutton />
            </div>
            <Center>
                <TaskButton />
            </Center>
            <Line />
            <Center>
                <GroupList groupList={["グループ1", "グループ2", "グループ3"]}/>
            </Center>
            <Center>
                <AddGroupButton isLogin={true} />
            </Center>
        </Back>
    )
}