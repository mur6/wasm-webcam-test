const _makeVideoParams = (mode) => {
    let params = {
        width: 1280, height: 720
    };
    if (mode == "user") {
        params["facingMode"] = "user";
        return params;
    } else if (mode == "environment") {
        params["facingMode"] = { exact: "environment" };
        return params;
    }
    return params;
};

class Video {
    boxWidth = 405;
    boxHeight = 720;

    constructor() {
        let video = document.createElement("video");
        video.setAttribute("autoplay", true);
        video.setAttribute("playsinline", true);
        video.style.display = "none";
        document.body.appendChild(video);
        // ....
        let canvas = document.createElement("canvas");
        this.video = video;
        this.canvas = canvas;
    }

    getCanvas() {
        return this.canvas;
    }

    switchCamera(mode) {
        const videoElement = this.video;
        const video_params = _makeVideoParams(mode);
        console.log(video_params);
        navigator.mediaDevices.getUserMedia(
            {video: video_params, audio: false}
            ).then((stream) => (videoElement.srcObject = stream));
    }

    stopCamera() {
        const videoElement = this.video;
        videoElement.srcObject && videoElement.srcObject.getTracks().forEach(t => t.stop());
    }

    draw(canvas) {
        let ctx = canvas.getContext('2d');
        if (canvas.width > 0 && canvas.height > 0) {
            let w = this.boxWidth;
            let h = this.boxHeight;
            let x_margin = Math.floor((this.video.videoWidth - w) / 2);
            ctx.drawImage(this.video, x_margin, 0, w, h, 0, 0, w, h);
        }
    }

    setCanvasSize() {
        // this.video.videoWidth, this.video.videoHeight
        this.canvas.width = this.boxWidth;
        this.canvas.height = this.boxHeight;
    }

    copyToCanvas() {
        this.setCanvasSize();
        this.draw(this.canvas)
    }
}

export default new Video();
