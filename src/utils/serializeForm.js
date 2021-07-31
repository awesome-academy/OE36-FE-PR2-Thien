export default function serializeForm(form) {
    let result = {};
    for(const input of form){
        result[input.name] = input.files || input.value
    }
    return result;
}