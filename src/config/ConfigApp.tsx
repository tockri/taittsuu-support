import React from "react"
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, SxProps } from "@mui/material"
import { useAtom } from "jotai"
import { ConfigState } from "./ConfigState"

export const ConfigApp: React.FC = () => {
  const [values, setValues] = useAtom(ConfigState.atom)
  return (
    <Box sx={RootStyle}>
      <FormGroup>
        <Stack direction="column" gap={1}>
          <h1>どこでもタイーツ設定</h1>
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
            label="タイーツ入力ボックスを広げる"
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
            label="タイーツ入力ボックスに文字数を表示する"
          />
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
  }
}
