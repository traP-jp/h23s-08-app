// タスク追加 (モーダル)
// 看板に書き込む
// タイトル
// 期限 (必須ではない)
// 詳細はなし

import styled from '@emotion/styled'
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';


const CreateTaskModal = () => {
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
    border: 1px solid black;
  `
  const Modal = styled(Dialog.Content)`
    /* 板の部分 */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 8px;
    position: relative;
    width: 320px;
    height: 200px;
    background: #ba9162;

    /* 棒の部分 */
    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 32px;
      height: 320px;
      top: -20px;
      left: calc(50% - 16px);
      z-index: -1;
      background: #885f30;
    }
  `
  const ModalTitle = styled(Dialog.Title)`
    color: white;
    font-size: large;
    font-weight: bold;
  `
  const InputContent = styled.textarea`
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


  const [contentValue, setContentValue] = useState<string>("");
  
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ButtonTrigger>開く</ButtonTrigger>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Center>
          <Modal>
            <ModalTitle>タスクを追加</ModalTitle>
            <InputContent id="content" onChange={(e) => setContentValue(e.target.value)} value={contentValue} placeholder="ここにタスクを入力"></InputContent>
            <Button onClick={() => {alert(contentValue + "を追加します"); setContentValue("")}}>追加</Button>
            <Dialog.Close asChild>
              <Button>閉じる</Button>
            </Dialog.Close>
          </Modal>
        </Center>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default CreateTaskModal;
