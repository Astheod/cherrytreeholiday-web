<script>

   export let author;
   export let sent;
   export let content;

   let date = new Date(sent*24*60*60*1000);
   let year = date.getFullYear();
   let month = date.getMonth()+1;
   let day = date.getDate();

   if(month < 10) month = "0"+month;
   if(day < 10) day = "0"+day;
</script>


<div class="chat-message-left mb-4">
    <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="fw-bold mb-1">{author}</div>
        {content}
        <div class="text-muted small text-nowrap mt-2">{year}-{month}-{day}</div>
    </div>
</div>
<style>


    .chat-message-left{
        display: flex;
        flex-shrink: 0
    }

    .chat-message-left {
        margin-right: auto
    }
</style>