export const jsonify = (x) => JSON.stringify(x, null, 2)

// Start collapse logic
export function toggleCollapse(e) {
    const elem = e.currentTarget;
    const growDiv = elem.querySelector('.job-child-job-container');
    console.log(growDiv.style.height);
    if (growDiv.style.height == "auto") {
        growDiv.style.height = 0;
    } else {
        growDiv.style.height = "auto";
    }
}
// End collapse logic