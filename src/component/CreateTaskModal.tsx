// タスク追加 (モーダル)
// 看板に書き込む
// タイトル
// 期限 (必須ではない)
// 詳細はなし

import styled from '@emotion/styled'
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';


const CreateTaskModal = () => {
  const ButtonOpen = styled(Dialog.Trigger)`
    border: 1px solid black;
  `
  const ButtonClose = styled(Dialog.Close)`
    border: 1px solid black;
  `
  const Modal = styled(Dialog.Content)`
    border: 1px solid black;
  `
  const ModalTitle = styled(Dialog.Title)`
    font-size: large;
    font-weight: bold;
  `
  const InputContent = styled.textarea`
    border: 1px solid black;
  `

  const [contentValue, setContentValue] = useState<string>("");
  
  return (
    <Dialog.Root>
      <ButtonOpen asChild>
        <button>開く</button>
      </ButtonOpen>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Modal>
          <ModalTitle>タスクを追加</ModalTitle>
          <InputContent id="content" onChange={(e) => setContentValue(e.target.value)} placeholder="ここにタスクを入力">{contentValue}</InputContent>
          <ButtonClose asChild onClick={() => {alert(contentValue + "を追加します"); setContentValue("")}}>
            <button>追加</button>
          </ButtonClose>
          <ButtonClose asChild>
            <button>閉じる</button>
          </ButtonClose>
        </Modal>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default CreateTaskModal;
