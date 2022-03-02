import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'

import MuiMarkdown from '@/components/detail/MuiMarkdown'
import { RootState, useAppDispatch, useAppSelector } from '@/store'
import { fetchContent } from '@/store/workflow'
import { DraftWorkflow, PublishedWorkflow } from '@/store/workflows'

interface Props {
  wf: PublishedWorkflow | DraftWorkflow
  sx?: object
}

const ContentBox: React.VFC<Props> = (props: Props) => {
  const contents = useAppSelector((state: RootState) => state.workflow.contents)
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('readme')

  useEffect(() => {
    dispatch(
      fetchContent({
        name: 'readme',
        url: props.wf.config.workflow.readme,
      })
    )
  }, [dispatch])

  return (
    <React.Fragment>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', ...props.sx }}>
        <Tabs
          indicatorColor='secondary'
          onChange={(_, value) => setActiveTab(value)}
          textColor='secondary'
          value={activeTab}>
          <Tab label='Readme' value='readme' />
          <Tab label='Files' value='files' />
        </Tabs>
      </Box>
      {activeTab === 'readme' && 'readme' in contents && (
        <MuiMarkdown children={contents.readme.content} sx={{ px: 2 }} />
      )}
      {activeTab === 'files' && <Box children={'files'} />}
    </React.Fragment>
  )
}

export default ContentBox