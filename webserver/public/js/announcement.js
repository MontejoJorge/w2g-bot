function validForm () {
    let announcementTextarea = $("[name=announcementText]").clone();

    if (announcementTextarea.val().length > 2000 || announcementTextarea.val().length == 0) {
        announcementTextarea.addClass("is-invalid");   

    } else {
        $("#announcementModal").modal('toggle');
        $("#submitAnnouncement").prop("disabled", true);
        $("#submitAnnouncement span").removeClass("d-none");
        announcementTextarea.prop("disabled", true);

        $("#announcementForm").submit();
    }
}