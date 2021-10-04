function validForm () {
    let announcementTextarea = $("[name=announcementText]");

    if (announcementTextarea.val().length > 2000 || announcementTextarea.val().length == 0) {
        announcementTextarea.addClass("is-invalid");   

    } else {
        $("#announcementForm").submit();
    }
}