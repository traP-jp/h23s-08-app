import styled from '@emotion/styled'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import { useState } from 'react'

const Center = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
const Button = styled.button`
  background: gold;
  color: #885f30;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
`
const ButtonTrigger = styled.button`
  position: fixed;
  width: 64px;
  height: 64px;
  font-size: 32px;
  background: white;
  left: calc(50% - 32px);
  bottom: 16px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
`
const DialogContent = styled(Dialog.Content)`
  /* 板の部分 */
  position: relative;
  width: 320px;
  height: 240px;
  background: #ba9162;
  padding-top: 12px;

  /* 棒の部分 */
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 32px;
    height: 360px;
    top: -32px;
    left: calc(50% - 16px);
    z-index: -1;
    background: #885f30;
  }
`
const TabsList = styled(Tabs.List)`
  position: absolute;
  top: -32px;
`
const TabsTrigger = styled(Tabs.Trigger)`
  font-size: small;
  font-weight: bold;
  color: white;
  padding: 0 8px;
  border-radius: 4px 4px 0 0;
  height: 32px;
  background: #885f30;
  cursor: pointer;
  &[data-state='active'] {
    background: #ba9162;
  }
`
const TabsContent = styled(Tabs.Content)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 8px;
`
const SelectTrigger = styled(Select.Trigger)`
  width: calc(100% - 16px);
  color: white;
  cursor: pointer;
`
const SelectContent = styled(Select.Content)`
  padding: 4px 8px;
  border-radius: 4px;
  background: #885f30;
  color: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  cursor: pointer;
`
const DialogTitle = styled(Dialog.Title)`
  color: white;
  font-size: large;
  font-weight: bold;
`
const Label = styled.label`
  font-weight: bold;
  color: white;
`
const Input = styled.input`
  background: white;
  width: calc(100% - 16px);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: text;
  &::placeholder {
    color: gray;
  }
`
const DialogOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`

interface Props {
  isLogin: boolean
  groupList: string[]
}

const SelectGroup = (props: { groupList: string[] }) => {
  return (
    <Select.Root>
      <SelectTrigger>
        <Select.Value placeholder='グループを選択' />
        <Select.Icon />
      </SelectTrigger>

      <Select.Portal>
        <SelectContent>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              {props.groupList.map(group => (
                <Select.Item key={group} value={group}>
                  <Select.ItemText>{group}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}

const CreateTaskModal = (props: Props) => {
  const [title, setTitle] = useState('')

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonTrigger>+</ButtonTrigger>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Center>
          <DialogContent>
            <Tabs.Root defaultValue='personal'>
              <TabsList>
                <TabsTrigger value='personal'>個人</TabsTrigger>
                <TabsTrigger value='group'>グループ</TabsTrigger>
              </TabsList>

              <TabsContent value='personal'>
                <DialogTitle>タスクを追加</DialogTitle>
                <fieldset>
                  <Label htmlFor='InputPersonal'>タイトル</Label>
                  <Input
                    id='InputPersonal'
                    placeholder='論文執筆'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>
                <Button onClick={() => setTitle('')}>個人に追加</Button>
                <Dialog.Close asChild>
                  <Button>閉じる</Button>
                </Dialog.Close>
              </TabsContent>

              <TabsContent value='group'>
                <DialogTitle>タスクを追加</DialogTitle>
                <fieldset>
                  <Label htmlFor='InputGroup'>タイトル</Label>
                  <Input
                    id='InputGroup'
                    placeholder='論文執筆'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </fieldset>

                <SelectGroup groupList={...props.groupList} />

                <Button onClick={() => setTitle('')}>グループに追加</Button>
                <Dialog.Close asChild>
                  <Button>閉じる</Button>
                </Dialog.Close>
              </TabsContent>
            </Tabs.Root>
          </DialogContent>
        </Center>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateTaskModal
