export default function CommentActionBtn({ Icon, text, style, onClick }) {
  return (
    <button className={style} onClick={onClick}>
      <Icon /> <span className="text-sm">{ text }</span>
    </button>
  );
}
