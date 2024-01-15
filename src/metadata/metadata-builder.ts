export const builderMetadata = {
  default: {
    authors: [{ name: 'DALE™' }],
    title: 'DoIt | Task and Project Management',
    description:
      'A tool that blends your everyday. You now what have to do, just DoIt.'
  },
  workspace: (title: string) => ({
    title: `${title} Workspace | DoIt™`,
    description: `Workspace ${title} of user to management all task assigned`
  })
}
