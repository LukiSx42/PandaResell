import emojiFromType from "../shop/scripts/emojiFromType";
import findItemById from "../shop/scripts/findItemById";
import '../style/itemView.css';
import Navbar from './navbar';

function renderItem(item) {
    if (item === null) {
        return (
            <div>
                Item not found
            </div>
        );
    }
    let emoji = "";
    item.type.forEach(type => { emoji += emojiFromType(type)+" "; });
    return (
        <div className="item">
            <div className="side-item-box">
                <img
                    onClick={ (ev) => { window.open(ev.target.src, '_blank').focus(); } }
                    className="mainItemImage main-icon"
                    src={ "/images/" + item.seller + "/" + item.id + "_icon.png" }
                    alt="Main Image"
                />
                <div className="side-item-box-select">
                    <img
                        onClick={ (ev) => {
                            let main = document.getElementsByClassName("mainItemImage")[0];
                            main.src = "/images/" + item.seller + "/" + item.id + "_icon.png";
                            main.className = main.className.replace("main-size", "main-icon");
                            ev.target.className += " side-active";
                            document.getElementsByClassName("side-size")[0].className = "sideItemImage side-size";
                        }}
                        className="sideItemImage side-icon side-active"
                        src={ "/images/" + item.seller + "/" + item.id + "_icon.png" }
                        alt="Side Image"
                    />
                    <img
                        onClick={ (ev) => {
                            let main = document.getElementsByClassName("mainItemImage")[0];
                            main.src = "/images/" + item.seller + "/" + item.id + "_size.png";
                            main.className = main.className.replace("main-icon", "main-size");
                            ev.target.className += " side-active";
                            document.getElementsByClassName("side-icon")[0].className = "sideItemImage side-icon";
                        }}
                        className="sideItemImage side-size"
                        src={ "/images/" + item.seller + "/" + item.id + "_size.png" }
                        alt="Side Image"
                    />
                </div>
            </div>
            <div className="item-info-box">
                <h1>{ emoji + item.brand.join(" ") } ~ { item.price[0][1] }€</h1>
                <p>{ item.name }</p>
            </div>
        </div>
    );
}

function renderButtons(item) {
    return (
        <div>
            <main className="card-btns">
                <ul>
                    <svg className="btn-icon photo-icon" viewBox="0 -0.5 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M532,254.954383 L532,247.775909 L520,247.775909 L520,258.615121 L522.848655,255.813199 C523.24044,255.427841 523.87547,255.423851 524.271358,255.808487 L525.05481,256.569671 L528.568706,253.033719 C528.958829,252.641147 529.59365,252.630547 530.001301,253.024219 L532,254.954383 Z M533,259.406871 L533.960593,259.541874 C534.51207,259.619379 535.020377,259.235606 535.097766,258.684953 L536.765938,246.815293 C536.843443,246.263816 536.459671,245.75551 535.909017,245.678121 L524.039358,244.009949 C523.487881,243.932444 522.979574,244.316216 522.902185,244.86687 L522.633887,246.775909 L520.006845,246.775909 C519.449949,246.775909 519,247.226689 519,247.782754 L519,259.769063 C519,260.32596 519.45078,260.775909 520.006845,260.775909 L531.993155,260.775909 C532.550051,260.775909 533,260.325128 533,259.769063 L533,259.406871 Z M533,258.397037 L534.10657,258.552556 L535.776647,246.669339 L523.89343,244.999262 L523.643739,246.775909 L531.993155,246.775909 C532.54922,246.775909 533,247.225857 533,247.782754 L533,258.397037 Z" transform="translate(-519 -244)"/>
                    </svg>
                    <li
                        onClick={ () => { window.open(item.yupoo, '_blank').focus() } }
                        onMouseEnter={() => { document.getElementsByClassName("photo-icon")[0].className.baseVal = "btn-icon photo-icon icon-active"; }}
                        onMouseLeave={() => { document.getElementsByClassName("photo-icon")[0].className.baseVal = "btn-icon photo-icon"; }}
                    >
                    Fotky
                    <span></span><span></span><span></span><span></span>
                    </li>
                    <svg className="btn-icon cam-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <li
                        onClick={ () => { window.open("https://qc.photos/qc?url="+item.w2c.replace("ft=t&", "").replaceAll("/", "%2F").replaceAll(":", "%3A").replaceAll("?", "%3F").replaceAll("&", "%26").replaceAll("=", "%3D")).focus() } }
                        onMouseEnter={() => { document.getElementsByClassName("cam-icon")[0].className.baseVal = "btn-icon cam-icon icon-active-stroke"; }}
                        onMouseLeave={() => { document.getElementsByClassName("cam-icon")[0].className.baseVal = "btn-icon cam-icon"; }}
                    >
                    QCs
                    <span></span><span></span><span></span><span></span>
                    </li>
                    <svg className="btn-icon link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <li
                        onClick={ () => { navigator.clipboard.writeText(item.w2c); } }
                        onMouseEnter={() => { document.getElementsByClassName("link-icon")[0].className.baseVal = "btn-icon link-icon icon-active-stroke"; }}
                        onMouseLeave={() => { document.getElementsByClassName("link-icon")[0].className.baseVal = "btn-icon link-icon"; }}
                    >
                    W2C Link
                    <span></span><span></span><span></span><span></span>
                    </li>
                    <svg className="btn-icon phone-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.1007 13.359L15.5719 12.8272H15.5719L16.1007 13.359ZM16.5562 12.9062L17.085 13.438H17.085L16.5562 12.9062ZM18.9728 12.5894L18.6146 13.2483L18.9728 12.5894ZM20.8833 13.628L20.5251 14.2869L20.8833 13.628ZM21.4217 16.883L21.9505 17.4148L21.4217 16.883ZM20.0011 18.2954L19.4723 17.7636L20.0011 18.2954ZM18.6763 18.9651L18.7459 19.7119H18.7459L18.6763 18.9651ZM8.81536 14.7266L9.34418 14.1947L8.81536 14.7266ZM4.00289 5.74561L3.2541 5.78816L3.2541 5.78816L4.00289 5.74561ZM10.4775 7.19738L11.0063 7.72922H11.0063L10.4775 7.19738ZM10.6342 4.54348L11.2346 4.09401L10.6342 4.54348ZM9.37326 2.85908L8.77286 3.30855V3.30855L9.37326 2.85908ZM6.26145 2.57483L6.79027 3.10667H6.79027L6.26145 2.57483ZM4.69185 4.13552L4.16303 3.60368H4.16303L4.69185 4.13552ZM12.0631 11.4972L12.5919 10.9654L12.0631 11.4972ZM16.6295 13.8909L17.085 13.438L16.0273 12.3743L15.5719 12.8272L16.6295 13.8909ZM18.6146 13.2483L20.5251 14.2869L21.2415 12.9691L19.331 11.9305L18.6146 13.2483ZM20.8929 16.3511L19.4723 17.7636L20.5299 18.8273L21.9505 17.4148L20.8929 16.3511ZM18.6067 18.2184C17.1568 18.3535 13.4056 18.2331 9.34418 14.1947L8.28654 15.2584C12.7186 19.6653 16.9369 19.8805 18.7459 19.7119L18.6067 18.2184ZM9.34418 14.1947C5.4728 10.3453 4.83151 7.10765 4.75168 5.70305L3.2541 5.78816C3.35456 7.55599 4.14863 11.144 8.28654 15.2584L9.34418 14.1947ZM10.7195 8.01441L11.0063 7.72922L9.9487 6.66555L9.66189 6.95073L10.7195 8.01441ZM11.2346 4.09401L9.97365 2.40961L8.77286 3.30855L10.0338 4.99296L11.2346 4.09401ZM5.73263 2.04299L4.16303 3.60368L5.22067 4.66736L6.79027 3.10667L5.73263 2.04299ZM10.1907 7.48257C9.66189 6.95073 9.66117 6.95144 9.66045 6.95216C9.66021 6.9524 9.65949 6.95313 9.659 6.95362C9.65802 6.95461 9.65702 6.95561 9.65601 6.95664C9.65398 6.95871 9.65188 6.96086 9.64972 6.9631C9.64539 6.96759 9.64081 6.97245 9.63599 6.97769C9.62634 6.98816 9.61575 7.00014 9.60441 7.01367C9.58174 7.04072 9.55605 7.07403 9.52905 7.11388C9.47492 7.19377 9.41594 7.2994 9.36589 7.43224C9.26376 7.70329 9.20901 8.0606 9.27765 8.50305C9.41189 9.36833 10.0078 10.5113 11.5343 12.0291L12.5919 10.9654C11.1634 9.54499 10.8231 8.68059 10.7599 8.27309C10.7298 8.07916 10.761 7.98371 10.7696 7.96111C10.7748 7.94713 10.7773 7.9457 10.7709 7.95525C10.7677 7.95992 10.7624 7.96723 10.7541 7.97708C10.75 7.98201 10.7451 7.98759 10.7394 7.99381C10.7365 7.99692 10.7335 8.00019 10.7301 8.00362C10.7285 8.00534 10.7268 8.00709 10.725 8.00889C10.7241 8.00979 10.7232 8.0107 10.7223 8.01162C10.7219 8.01208 10.7212 8.01278 10.7209 8.01301C10.7202 8.01371 10.7195 8.01441 10.1907 7.48257ZM11.5343 12.0291C13.0613 13.5474 14.2096 14.1383 15.0763 14.2713C15.5192 14.3392 15.8763 14.285 16.1472 14.1841C16.28 14.1346 16.3858 14.0763 16.4658 14.0227C16.5058 13.9959 16.5392 13.9704 16.5663 13.9479C16.5799 13.9367 16.5919 13.9262 16.6024 13.9166C16.6077 13.9118 16.6126 13.9073 16.6171 13.903C16.6194 13.9008 16.6215 13.8987 16.6236 13.8967C16.6246 13.8957 16.6256 13.8947 16.6266 13.8937C16.6271 13.8932 16.6279 13.8925 16.6281 13.8923C16.6288 13.8916 16.6295 13.8909 16.1007 13.359C15.5719 12.8272 15.5726 12.8265 15.5733 12.8258C15.5735 12.8256 15.5742 12.8249 15.5747 12.8244C15.5756 12.8235 15.5765 12.8226 15.5774 12.8217C15.5793 12.82 15.581 12.8183 15.5827 12.8166C15.5862 12.8133 15.5895 12.8103 15.5926 12.8074C15.5988 12.8018 15.6044 12.7969 15.6094 12.7929C15.6192 12.7847 15.6265 12.7795 15.631 12.7764C15.6403 12.7702 15.6384 12.773 15.6236 12.7785C15.5991 12.7876 15.501 12.8189 15.3038 12.7886C14.8905 12.7253 14.02 12.3853 12.5919 10.9654L11.5343 12.0291ZM9.97365 2.40961C8.95434 1.04802 6.94996 0.83257 5.73263 2.04299L6.79027 3.10667C7.32195 2.578 8.26623 2.63181 8.77286 3.30855L9.97365 2.40961ZM4.75168 5.70305C4.73201 5.35694 4.89075 4.9954 5.22067 4.66736L4.16303 3.60368C3.62571 4.13795 3.20329 4.89425 3.2541 5.78816L4.75168 5.70305ZM19.4723 17.7636C19.1975 18.0369 18.9029 18.1908 18.6067 18.2184L18.7459 19.7119C19.4805 19.6434 20.0824 19.2723 20.5299 18.8273L19.4723 17.7636ZM11.0063 7.72922C11.9908 6.7503 12.064 5.2019 11.2346 4.09401L10.0338 4.99295C10.4373 5.53193 10.3773 6.23938 9.9487 6.66555L11.0063 7.72922ZM20.5251 14.2869C21.3429 14.7315 21.4703 15.7769 20.8929 16.3511L21.9505 17.4148C23.2908 16.0821 22.8775 13.8584 21.2415 12.9691L20.5251 14.2869ZM17.085 13.438C17.469 13.0562 18.0871 12.9616 18.6146 13.2483L19.331 11.9305C18.2474 11.3414 16.9026 11.5041 16.0273 12.3743L17.085 13.438Z" />
                    </svg>
                    <li 
                        onMouseEnter={() => { document.getElementsByClassName("phone-icon")[0].className.baseVal = "btn-icon phone-icon icon-active"; }}
                        onMouseLeave={() => { document.getElementsByClassName("phone-icon")[0].className.baseVal = "btn-icon phone-icon"; }}
                        onClick={ () => { window.location.href = "/kontakt" } }
                    >
                    Kontakt
                    <span></span><span></span><span></span><span></span>
                    </li>
                </ul>
            </main>
        </div>
    );
}

function itemView() {
    // If no repId is provided then redirect to the error page
    if (window.location.href.split("repId=").length < 2) {
        window.location.href = "/error";
    }
    let item = findItemById(window.location.href.split("repId=")[1]);
    return (
        <div className="item-view">
            <div className="item-view-background" > </div>
            <Navbar />
            <div className="card-view">
                <div className="card item-card">
                    { renderItem(item) }
                    <p id="card-credits">By LukiS</p>
                </div>
                <div className="card info-card">
                    <h1>VIAC:</h1>
                    { renderButtons(item) }
                    <br />
                </div>  
            </div>
        </div>
    );
}

export default itemView;