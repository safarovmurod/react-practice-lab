export default function DialogInfo({user,setInfo}) {
if (!user) {
   return null
}
  return (
    <dialog open={user}>
      <img src={user.img} alt="" />
      <h1>{user.name}</h1>
      <h1>{user.job}</h1>
      <button onClick={()=>setInfo(null)}>cancel</button>
    </dialog>
  )
}