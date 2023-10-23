import React from "react"
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
  Tooltip
} from "@mui/material"
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
          <ConfigCheckView
            label="表示時にフォーカス"
            value={values.focusOnTaiitsuInput}
            tooltip="入力ボックスを表示したとき、自動的にフォーカスします。"
            onChange={(focusOnTaiitsuInput) => setValues({ focusOnTaiitsuInput })}
          />
          <ConfigCheckView
            label="Ctrl+Enter（⌘+Enter）で送信する"
            value={values.submitByKeyboard}
            tooltip="入力ボックス内でCtrl+Enterまたは⌘+Enterをタイプすると送信します。"
            onChange={(submitByKeyboard) => setValues({ submitByKeyboard })}
          />
          <ConfigCheckView
            label="入力ボックスの幅を広げる"
            value={values.wideInput}
            tooltip="タイーツを書き込むエリアを少しだけ大きくします。"
            onChange={(wideInput) => setValues({ wideInput })}
          />
          <ConfigCheckView
            label="入力ボックスに文字数を表示する"
            value={values.showCharCount}
            tooltip="文字を入力する際、リアルタイムに文字数をカウントして表示します。"
            onChange={(showCharCount) => setValues({ showCharCount })}
          />

          <h2>タイムライン</h2>
          <ConfigCheckView
            label="常にヘッダを表示する"
            value={values.modifyHeader}
            tooltip="タイムラインをスクロールしたとき、タイムラインのタイトルとカスタムTLのリンクが常にクリック可能な位置に残ります。"
            onChange={(modifyHeader) => setValues({ modifyHeader })}
          />
          <ConfigCheckView
            label="タイムラインの続きを自動で読み込む"
            value={values.loadTimelineAutomatically}
            tooltip="ホームやパブリックタイムライン等の画面で、「もっと見る」ボタンをクリックしなくても自動で読み込みます。"
            onChange={(loadTimelineAutomatically) => setValues({ loadTimelineAutomatically })}
          />
          <ConfigCheckView
            label="タイーツの画像を画面内ビューアで開く"
            value={values.lightboxOnImage}
            tooltip="タイーツに添付されている画像を別タブではなく画面内ですばやく開きます。"
            onChange={(lightboxOnImage) => setValues({ lightboxOnImage })}
          />
          <ConfigCheckView
            label="文字をマウスでなぞって選択できるようにする"
            value={values.disablePostLink}
            tooltip="タイッツーのポスト全体がリンクになっていてテキストを選択できない問題を解消します。ポスト日時の部分は変わらずリンクになっています。"
            onChange={(disablePostLink) => setValues({ disablePostLink })}
          />
          <ConfigCheckView
            label="いいね、RTを非表示にする"
            value={values.hideFavRet}
            tooltip="数字に一喜一憂しないタイッツーライフを送ります。"
            onChange={(hideFavRet) => setValues({ hideFavRet })}
          />

          <h2>通知画面</h2>
          <ConfigCheckView
            label="通知画面でアカウント名をリンクにする"
            value={values.linkOnNoticeUser}
            tooltip="「◯◯さんに♥いいねされました」などのメッセージの「◯◯さん」をリンクにします。"
            onChange={(linkOnNoticeUser) => setValues({ linkOnNoticeUser })}
          />

          <h2>検索画面</h2>
          <ConfigCheckView
            label="検索画面を使いやすくする"
            value={values.refineSearchBox}
            tooltip="今選択している検索モードをもっとわかりやすくし、入力ボックスでEnterをタイプしたら検索実行します。"
            onChange={(refineSearchBox) => setValues({ refineSearchBox })}
          />

          <h2>どこでもタイーツ機能</h2>
          <ConfigCheckView
            label="Xのシェア画面をタイーツ画面で置き換える"
            value={values.overrideTwitter}
            tooltip="様々なサイトのX連携ボタンから、タイーツ画面を開けます。"
            onChange={(overrideTwitter) => setValues({ overrideTwitter })}
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

const ConfigCheckView: React.FC<{
  value: boolean | undefined
  label: string
  tooltip: string
  onChange: (newValue: boolean) => void
}> = ({ value, label, tooltip, onChange }) => {
  return (
    <Tooltip title={tooltip} arrow placement="top-end" disableInteractive>
      <FormControlLabel
        control={<Checkbox defaultChecked={value} onChange={(e) => onChange(e.target.checked)} />}
        label={label}
      />
    </Tooltip>
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
