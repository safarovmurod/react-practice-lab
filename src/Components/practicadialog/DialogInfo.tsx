export default function DialogInfo({ user, setInfo }) {
   if (!user) return null

  return (
      <dialog open>
         <h1>{user.name}</h1>
         <button type="button" onClick={() => setInfo(null)}>cancel</button>
      </dialog>
  )
}
