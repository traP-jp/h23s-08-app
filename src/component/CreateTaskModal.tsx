import styled from '@emotion/styled'
import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'

interface Props {
  isLogin: boolean,
  groupList: string[],
}

const CreateTaskModal = (props: Props) => {
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
  `
  const ButtonTrigger = styled.button`
    position: fixed;
    width: 64px;
    height: 64px;
    font-size: 32px;
    backgroud: white;
    left: calc(50% - 32px);
    bottom: 16px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: 1px solid black;
  `
  const Modal = styled(Dialog.Content)`
    /* 板の部分 */
    position: relative;
    width: 320px;
    height: 240px;
    background: #ba9162;

    /* 棒の部分 */
    &::after {
      content: "";
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
  const TabsContent = styled(Tabs.Content)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 8px;
  `
  const SelectTrigger = styled(Select.Trigger)`
    width: 90%;
    color: blue;
  `
  const SelectContent = styled(Select.Content)`
    width: 90%;
    color: red;
  `
  const ModalTitle = styled(Dialog.Title)`
    color: white;
    font-size: large;
    font-weight: bold;
  `
  const Input = styled.textarea`
    background: white;
    width: 90%;
    height: 100px;
    border-radius: 4px;
    padding: 4px;
  `
  const Overlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    inset: 0;
    z-index: -2;
  `
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonTrigger>+</ButtonTrigger>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Center>
          <Modal>
            <Tabs.Root defaultValue='personal'>
              <Tabs.List>
                <Tabs.Trigger value='personal'>
                  個人
                </Tabs.Trigger>
                <Tabs.Trigger value='group'>
                  グループ
                </Tabs.Trigger>
              </Tabs.List>
              <TabsContent value='personal'>
                <ModalTitle>タスクを追加</ModalTitle>
                <Input placeholder="ここにタスクを入力"></Input>
                <Button>個人に追加</Button>
                <Dialog.Close asChild>
                  <Button>閉じる</Button>
                </Dialog.Close>
              </TabsContent>
              <TabsContent value='group'>
                <ModalTitle>タスクを追加</ModalTitle>
                <Input placeholder="ここにタスクを入力"></Input>
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
                <Button>グループに追加</Button>
                <Dialog.Close asChild>
                  <Button>閉じる</Button>
                </Dialog.Close>
              </TabsContent>
            </Tabs.Root>
          </Modal>
        </Center>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default CreateTaskModal
