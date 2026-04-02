export default function Loading() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900' />
        <p className='text-sm text-zinc-400'>Loading...</p>
      </div>
    </div>
  )
}
