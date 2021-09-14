import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './pages/TeamsList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import UsersList from './pages/UsersList.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams', // if our-domain.com/teams => TeamsList
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      // nested route
      children: [
        {
          name: 'team-members',
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      path: '/users', // if our-domain.com/teams => UsersList
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log(to, from);
        next();
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/teams'
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  }
});
// before each page trigger this function with the parameters of 'to, from, and next'
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.needsAuth) {
    console.log('User needs authentication!');
    next();
  } else {
    next();
  }
  // next() allows the transition to next page
  next();
});

router.afterEach((to, from) => {
  // sending analytics data to server (possibly)
  console.log(to, from);
});

export default router;
