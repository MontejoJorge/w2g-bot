function validForm () {
    let announcementTextarea = $("[name=announcementText]").clone();

    if (announcementTextarea.val().length > 2000 || announcementTextarea.val().length == 0) {
        $("[name=announcementText]").addClass("is-invalid");
        $("#announcementModal").modal('toggle');  

    } else {
        $("#announcementModal").modal('toggle');
        $("#submitAnnouncement").prop("disabled", true);
        $("#submitAnnouncement span").removeClass("d-none");
        $("[name=announcementText]").prop("disabled", true);

        $("#announcementForm").submit();
    }
}