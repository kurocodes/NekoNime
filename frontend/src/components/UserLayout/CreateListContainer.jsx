export default function CreateListContainer() {
  return (
    <div className="fixed top-1/2 right-1/2 -translate-y-[50%] translate-x-[50%] bg-white rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)] px-4 py-2">
      <h3 className="text-lg font-semibold text-primary text-center mb-2">Create Custom List</h3>

      <form>
        <div className="">
          <input
            id="listTitle"
            type="text"
            placeholder="Enter List Name"
            className="outline-2 outline-primary px-2 py-1 rounded-md"
          />
        </div>
        <div className="mt-2">
          <select name="visibility" id="visibility" className="border-2 outline-0 border-primary w-full px-2 py-1 rounded-md">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>

        <button className="bg-primary w-full mt-2 py-1 rounded-md text-white">Create</button>
      </form>
    </div>
  );
}
