import React from "react"
import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Stack, SxProps } from "@mui/material"
import { useAtom } from "jotai"
import { ConfigState } from "./ConfigState"

export const ConfigApp: React.FC = () => {
  const [values, setValues] = useAtom(ConfigState.atom)
  return (
    <Box sx={RootStyle}>
      <FormGroup>
        <Stack direction="column" gap={1}>
          <h1>どこでもタイーツのカスタマイズ</h1>
          <h2>タイーツ入力ボックス</h2>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.focusOnTaiitsuInput}
                onChange={(e) => {
                  setValues({
                    focusOnTaiitsuInput: e.target.checked
                  })
                }}
              />
            }
            label="表示時にフォーカス"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.submitByKeyboard}
                onChange={(e) => {
                  setValues({
                    submitByKeyboard: e.target.checked
                  })
                }}
              />
            }
            label="Ctrl+Enter（⌘+Enter）で送信する"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.wideInput}
                onChange={(e) => {
                  setValues({
                    wideInput: e.target.checked
                  })
                }}
              />
            }
            label="入力ボックスの幅を広げる"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.showCharCount}
                onChange={(e) => {
                  setValues({
                    showCharCount: e.target.checked
                  })
                }}
              />
            }
            label="入力ボックスに文字数を表示する"
          />
          <h2>タイムライン</h2>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.modifyHeader}
                onChange={(e) => {
                  setValues({
                    modifyHeader: e.target.checked
                  })
                }}
              />
            }
            label="常にヘッダを表示する"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.loadTimelineAutomatically}
                onChange={(e) => {
                  setValues({
                    loadTimelineAutomatically: e.target.checked
                  })
                }}
              />
            }
            label="タイムラインの続きを自動で読み込む"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.lightboxOnImage}
                onChange={(e) => {
                  setValues({
                    lightboxOnImage: e.target.checked
                  })
                }}
              />
            }
            label="タイーツの画像を画面内ビューアで開く"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.disablePostLink}
                onChange={(e) => {
                  setValues({
                    disablePostLink: e.target.checked
                  })
                }}
              />
            }
            label="文字をマウスでなぞって選択できるようにする"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.hideFavRet}
                onChange={(e) => {
                  setValues({
                    hideFavRet: e.target.checked
                  })
                }}
              />
            }
            label="いいね、RTを非表示にする"
          />
          <h2>通知画面</h2>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.linkOnNoticeUser}
                onChange={(e) => {
                  setValues({
                    linkOnNoticeUser: e.target.checked
                  })
                }}
              />
            }
            label="通知画面でアカウント名をリンクにする"
          />
          <h2>どこでもタイーツ機能</h2>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={values.overrideTwitter}
                onChange={(e) => {
                  setValues({
                    overrideTwitter: e.target.checked
                  })
                }}
              />
            }
            label="Xのシェア画面をタイーツ画面で置き換える"
          />

          <RadioGroup
            defaultValue={values.inputPagePath || "home"}
            onChange={(e) => {
              setValues({
                inputPagePath: e.target.value === "home" ? "home" : "publictimeline"
              })
            }}
          >
            <FormLabel sx={{ mt: 2 }}>タイーツする時に開く画面</FormLabel>
            <Stack direction="row" alignItems="center">
              <FormControlLabel value="home" control={<Radio />} label="ホーム" />
              <FormControlLabel value="publictimeline" control={<Radio />} label="パブリックタイムライン" />
            </Stack>
          </RadioGroup>
        </Stack>
      </FormGroup>
    </Box>
  )
}

const RootStyle: SxProps = {
  boxSizing: "border-box",
  width: 440,
  p: 3,
  mx: "auto",
  " h1": {
    fontSize: "1.2rem",
    m: 0,
    my: 1,
    p: 0
  },
  " h2": {
    fontSize: "1.1rem",
    m: 0,
    my: 1,
    p: 0.5,
    borderBottom: "1px solid #ccc"
  }
}
