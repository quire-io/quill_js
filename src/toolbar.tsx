import { h } from 'tsx-dom';

export default (<div>
    <select class="ql-header">
        <option selected>Text</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
    </select>
    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
    <button class="ql-list" value="bullet"></button>
    <button class="ql-list" value="ordered"></button>
    <button class="ql-link"></button>
</div>);