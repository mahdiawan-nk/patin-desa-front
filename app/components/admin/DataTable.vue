<template>
  <div class="bg-white rounded-lg shadow overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-indigo-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Role</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.email" class="hover:bg-indigo-50 cursor-pointer">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]"
            >
              {{ user.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const users = [
  { name: 'Jane Cooper', email: 'jane.cooper@example.com', role: 'Admin', status: 'Active' },
  { name: 'Cody Fisher', email: 'cody.fisher@example.com', role: 'User ', status: 'Inactive' },
  { name: 'Esther Howard', email: 'esther.howard@example.com', role: 'User ', status: 'Active' },
  { name: 'Jenny Wilson', email: 'jenny.wilson@example.com', role: 'Moderator', status: 'Active' }
]
</script>