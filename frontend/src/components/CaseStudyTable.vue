<script>
export default {
    props: {
        catsntools: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}

</script>
<template>
    <div class="font-normal mt-10">
                        
        <h4 class="text-2xl font-bold text-white mb-4">Technologies &amp; Tools</h4>

        <div class="overflow-hidden w-[calc(100% + 6em)] -mx-6">
            <div class="w-full overflow-x-auto pb-4">
                <table class="table table-xs w-full bg-transparent text-slate-50 ">
                    <thead class="w-full bg-transparent">
                        <tr>
                            <th class="bg-transparent border-b border-slate-50/15 pl-6"><h5 class="font-bold text-lg">Category</h5></th>
                            <th class="bg-transparent border-b border-slate-50/15"><h5 class="font-bold text-lg">Tools</h5></th>
                        </tr>
                    </thead>
                    <tbody class="w-full">
                        <tr v-for="tech in catsntools">
                            <th class="w-1/3 bg-transparent border-b border-slate-50/15 relative z-10 pl-6"><p class="">{{ tech.category }}</p></th>
                            <td class="w-2/3 bg-transparent border-b border-slate-50/15 relative z-0"><p>{{ tech.tools }}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>  
</template>

<style>
.table tr th {
    @apply relative;
}

.table tbody th:before {
    content: "";
    @apply absolute w-full h-full block pl-6 backdrop-blur-3xl bg-gradient-to-r from-slate-500/0 to-slate-500/20 top-0 left-0 -z-10;
}

.table tbody tr:last-child td:first-child {
    @apply rounded-bl-3xl;
}
.table tbody tr:last-child td:first-child {
    @apply rounded-br-3xl;
}
</style>