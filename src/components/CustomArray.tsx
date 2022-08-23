import {Stack, Button, Card, Box, Text, Flex} from '@sanity/ui'
import * as React from 'react'
import {set, unset, ArrayOfObjectsMembers, ArrayOfObjectsInputProps} from 'sanity/form'

const EmptyBox = () => {
  return (
    <Card marginY={2} padding={3} shadow={2} radius={2}>
      <Text weight="bold">{"No key value pairs in list"}</Text>
    </Card>
  )
}

export function CustomArray(props: ArrayOfObjectsInputProps) {
  if (props.members.length === 0) return <EmptyBox />

  return (
    <Card>
      <ArrayOfObjectsMembers
        {...props}
        members={props.members}
        renderItem={(itemProps) => {
          const value = itemProps.value as undefined | {name?: string}
          if (props.members.length === 0) return <EmptyBox/>
          return (
            <Card marginY={2} padding={3} shadow={2} radius={2}>
              <Stack>
                <Box padding={2}>
                  <Text weight="bold">{value?.name}</Text>
                </Box>
                <Box flex={1}>{props.renderItem(itemProps)}</Box>
              </Stack>
            </Card>
          )
        }}
      />
    </Card>
  )
}
